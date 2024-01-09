const SalesModel = require("../models/SalesModel");

// Total Revenue

 /*exports.getTotalRevenue =  async (req, res) => {
    try {
         const totalRevenue = await SalesModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: { $multiply: ['$quantity', '$price'] } }
          }
        }
      ]);
  
      res.json({ totalRevenue: totalRevenue[0].total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Response Error' });
    }
  }*/


  exports.getTotalRevenue = async (req,res)=>{

  try{
    const totalRevenue = await SalesModel.aggregate([
        {
            $group:{
                _id:null,
                total:{$sum:{$multiply:["$quantity","$price"] }}
            }
        },

        res.status(200).json({totalRevenue:totalRevenue[0].total})

    ]);

  }catch(error){
    console.error(error);
    res.status(400).json({error:"Total Revenue calculation has failed."});
  }

  }


  //quantityByProduct

  exports.getQuantityByProduct=async (req, res) => {
    try {
      // Perform an aggregation using Mongoose's aggregate method
      const quantityByProduct = await SalesModel.aggregate([
        {
          $group: {
            _id: '$product',            // Group documents by the 'product' field
            totalQuantity: { $sum: '$quantity' }  // Calculate the sum of 'quantity' for each group
          }
        }
      ]);
  
      // Respond with the result as JSON
      res.json({ quantityByProduct });
    } catch (error) {
      // Handle any errors that occurred during the aggregation
      console.error(error);
      res.status(500).json({ error: 'Quantity By Product Server Error' });
    }
  }
  


  // Retrieve the top 5 products with the highest total revenue, along with their total revenue values.
  exports.getHighestTotalRevenue=async (req, res) => {
    try {
     
      const topProducts = await SalesModel.aggregate([
        {
          $group: {
            _id: '$product',  // Group documents by the 'product' field
            totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } }  // Calculate total revenue for each group
          }
        },
        {
          $sort: { totalRevenue: -1 }  // Sort the result in descending order based on total revenue
        },
        {
          $limit: 5  // Limit the result to the top 5 products
        }
      ]);
  
      // Respond with the result as JSON
      res.json({ topProducts });
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ error: 'HighestTotalRevenue Server Error' });
    }
  };
  
  


  // Calculate and return the average price of products sold.
 exports.getAveragePrice = async (req, res) => {
    try {
      const averagePrice = await SalesModel.aggregate([
        {
          $group: {
            _id: null,
            averagePrice: { $avg: '$price' }
          }
        }
      ]);
  
      res.json({ averagePrice: averagePrice[0].averagePrice });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'AveragePrice Server Error' });
    }
  };


  // Group the sales data by month and year and calculate the total revenue for
  // each month-year combination.

exports.getRevenueByMonthYear = async (req, res) => {
    try {
      const revenueByMonth = await SalesModel.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$date' },    // Extract the year from the 'date' field
              month: { $month: '$date' }   // Extract the month from the 'date' field
            },
            totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 }  // Sort by year and month in ascending order
        }
      ]);
  
      res.json({ revenueByMonth });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'revenueByMonth Server Error' });
    }
  };




  //Find and return the product that had the highest quantity sold on a single day.

  exports.getHighestQuantitySold = async (req, res) => {
    try {
      const highestQuantitySold = await SalesModel.aggregate([
        {
          $group: {
            _id: {
              product: '$product',
              date: '$date'
            },
            totalQuantity: { $sum: '$quantity' }
          }
        },
        {
          $sort: { totalQuantity: -1 }
        },
        {
          $limit: 1
        },
        {
          $project: {
            _id: 0,
            product: '$_id.product',
            date: '$_id.date',
            totalQuantity: 1
          }
        }
      ]);
  
      res.json({ highestQuantitySold: highestQuantitySold[0] || null });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'highestQuantitySold Server Error' });
    }
  };
  
  
// Calculate and return the total salary expense for each department.


exports.getDepartmentSalaryExpense = async (req, res) => {
    try {
      const departmentSalaryExpense = await SalesModel.aggregate([
        {
          $group: {
            _id: '$department',
            totalSalaryExpense: { $sum: { $multiply: ['$quantity', '$price'] } }
          }
        },
        {
          $sort: { totalSalaryExpense: -1 }
        }
      ]);
  
      res.json({ departmentSalaryExpense });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'departmentSalaryExpense Server Error' });
    }
  };
  
  