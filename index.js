import express from "express";
import mysql from 'mysql2'
import cors from 'cors'
import fs from 'fs'
import path from "path";
// import booksRoute from './routes/booksRoute.js'

const PORT = 9000

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 200,
    })
  )

  // app.get('/stream-audio', async (req, res) => {
  //   try {
  //    const pathToFile = path.resolve("/Users/oleksandrzdebskyi/Downloads/YAKTAK\ x\ KOLA\ -\ Porichka.mp3")

  //    res.setHeader('Content-Type', 'audio/mp3');
     
  //    fs.createReadStream(pathToFile).pipe(res);

  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });


  function generateByteRanges(fileSize, chunkSize) {
    const ranges = [];
    let start = 0;
    let end;
  
    while (start < fileSize) {
      end = Math.min(start + chunkSize - 1, fileSize - 1);
      ranges.push(`bytes=${start}-${end}`);
      start += chunkSize;
    }
  
    return ranges;
  }
  
  app.get('/stream-audio', (req, res) => {
    const audioFilePath = path.resolve("/Users/oleksandrzdebskyi/Downloads/YAKTAK\ x\ KOLA\ -\ Porichka.mp3");
    const chunkSize = 1024 * 1024; // 1MB
  
    fs.stat(audioFilePath, (err, stats) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      const fileSize = stats.size;
      const byteRanges = generateByteRanges(fileSize, chunkSize);
  
      byteRanges.forEach(byteRange => {
        const [, start, end] = /bytes=(\d+)-(\d+)/.exec(byteRange);
        const fileStream = fs.createReadStream(audioFilePath, { start: parseInt(start, 10), end: parseInt(end, 10) });
  
        // Set appropriate headers for the response
        res.setHeader('Content-Type', 'audio/mp3');
        res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
  
        // Pipe the stream to the response
        fileStream.pipe(res);
  
        // Listen for the 'error' event
        fileStream.on('error', error => {
          // Handle any errors that may occur during streaming
          console.error('Error reading stream:', error);
          res.status(500).send('Internal Server Error');
        });
      });
    });
  });
  





// app.use('/api/books', booksRoute)

// export const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'zdebskyy',
//     database: 'test'
// }).promise()

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zdebskyy';

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))