class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
    
    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};
      this.query = this.query.find({ ...keyword });
   

      return this;
    }
  
     filter() {


        try {
            const queryCopy = { ...this.queryStr };
        

            //   Removing some fields for category
            const removeFields = ["keyword", "page", "limit"];
        
            removeFields.forEach((key) => delete queryCopy[key]);
        
            // Filter For Price and Rating
               
                let queryStr = JSON.stringify(queryCopy);
            //     console.log(queryStr)
    
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        
            this.query = this.query.find(JSON.parse(queryStr));
            return this;
        } catch (error) {
            console.log(error)
            throw error;
        }
       
    }
  
        pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
        }
  }
  
  module.exports = ApiFeatures;