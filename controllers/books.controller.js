// import { db } from '../index.js'

// export const getAllBooks = async (req, res) => {
//   const q = 'SELECT * FROM test.books'
//   const [result] = await db.query(q)
  
//   if (!result) {
//     return res.status(400).json({ status: 'not ok' })
//   }
//   return res.status(200).json({ result })
// }

// export const addBook = async (req, res) => {
  
//   const q = 'INSERT INTO books (`title`, `description`, `cover`) VALUES(?)'
//   const { title, description, cover } = req.body
//   const values = [title, description, cover]

//   const [result] = await db.query(q, [values])
//   if (!result) {
//     return res.status(400).json({ status: 'not ok' })
//   }
//   return res.status(200).json({ result })
// }

// export const deleteBook = async (req, res) => {
//   const deleteQuery = 'DELETE FROM books WHERE id = ?';
//   const  id  = req.params.id
//   const [result] = await db.query(deleteQuery, [id])

//   return res
//       .status(200)
//       .json({ result })
// }

// export const deleteManyBooks = async (req, res) => {
//   const deleteQuery = 'DELETE FROM books WHERE id IN (?)';
//   const { ids } = req.body
//   const [result] = await db.query(deleteQuery, [ids])

//   return res
//       .status(200)
//       .json({ result })
// }
