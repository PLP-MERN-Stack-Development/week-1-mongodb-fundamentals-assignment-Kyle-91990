// Basic CRUD Operations
const findByGenre = db.books.find({ genre: "Science Fiction" });
const findByYear = db.books.find({ published_year: { $gt: 2010 } });
const findByAuthor = db.books.find({ author: "George Orwell" });
const updatePrice = db.books.updateOne(
  { title: "1984" },
  { $set: { price: 14.99 } }
);
const deleteBook = db.books.deleteOne({ title: "The Great Gatsby" });

// Advanced Queries
const inStockAndModern = db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

const projectedBooks = db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

const sortedByPrice = db.books.find().sort({ price: 1 }); // ascending
const paginatedBooks = db.books.find().skip(0).limit(5);

// Aggregation Pipeline
const averagePriceByGenre = db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

const authorWithMostBooks = db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

// Indexing
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: 1 });

// Performance Analysis
db.books.find({ title: "1984" }).explain("executionStats");
