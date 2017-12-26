    'use strict';
    const html = __dirname + '/dist';

    module.exports = function(app) {
      var db = require('./dbController');
      // todoList Routes

      app.route('/api/section/')
        /*
        Parameters
          sectionid = int

        If sectionid is not pressent then all sections will be sent
        */
        .get(db.section);

      app.route('/api/new/section/')
        /*
        Parameters
          name = string
          description = string
          token = string
        */
        .post(db.newSection);

      app.route('/api/part')
        /*
        Parameters
          sectionid = int
          partid = int

        If partid is not pressent then all parts in the current section will be sent
        */
        .get(db.part);

      app.route('/api/new/part/')
        /*
        Parameters
          name = string
          description = string
          videourl = string
          //TODO Add questions
        */
        .post(db.newPart);

      app.route('/api/result')
        /*
        Parameters
          studentid = int
          sectionid = int
          questionid = int
          answer = string
        */
        .post(db.saveResults)


      app.route('api/question')
        /*
        Parameters:
        exam, int, 0 or 1
          0 - No exam questions in the response
          1 - Only exam questions in the response
        id, int
          If the exam parameter is set to 0 then the ID value is interpreted as a
          part_ID, if the exam parameter is set to 1 id will be interpreted as a
          section_ID

        Example:
            www.sedu.fly/api/question?exam=0&id=12
        */
        .get(db.getQuestion);

      app.route('/api/login')
        /*
        Parameters:
          username
          password
          sessionid
        */
        .get(db.login)
        .post(db.login);

      app.route('/*')
        .get(function(req, res) {
            res.sendFile(html + '/index.html');
        });
  };
