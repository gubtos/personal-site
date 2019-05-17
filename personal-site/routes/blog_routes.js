module.exports = function(app, db) {
    const collection = 
    app.post('/notes', (req, res) => {
      const note = { text: req.body.body, title: req.body.title };
      db.collection('notes').insertOne(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });

    app.get('/blog', (req, res) => {
        res.send("aoo");
    });
    app.post('/blog', (req, res) => {
        console.log(req.body);
        res.send("a");
    });



    app.post('/companies',(req, res) => {
        data = req.body;
        const company = { 
            name: data.name, 
            description: data.description,
            cities : data.cities,
            categories: data.categories,
            site : data.site,
            jobsSite : data.jobsSite,
            imageURL : data.imageURL,
            categories : data.categories,
            opportunities : data.opportunities,
            fundation : data.fundation
        };
        db.collection('companies').insertOne(company, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
         });
    });

    app.get('/companies', (req, res) => {
        db.collection('companies').find({}).toArray((err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.json(item);
          }
        });
    });

  };