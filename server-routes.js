    'use strict';
    const html = __dirname + '/dist';

    module.exports = function(app) {
      var db = require('./server-dbController');
      // todoList Routes

      app.route('/api/section/')
        /*
        Parameters
          sectionid = int
        If sectionid is not pressent then all sections will be sent
        */
        .get(db.section)

        /*
        Parameters
          name = string
          description = string
          token = string
        */
        .post(db.newSection)

        /*
        Parameters
          name = string
          description = string
          section_id = string
          token = string
        */
        .put(db.editSection);

      app.route('/api/part/')
        /*
        Parameters
          section_id = int
          part_id = int

        If partid is not pressent then all parts in the current section will be sent
        */
        .get(db.part)

        /*
        Parameters
          section_id = int
          part_id = int
          name
          description
          video id from youtube
        */
        .put(db.editPart)

        /*
        Parameters
          section_id = int
          name
          description
          video id from youtube
        */
        .post(db.newPart);

      app.route('/api/question')
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
        .get(db.question)
        .post(db.newQuestion)
        .put(db.editQuestion)
        .delete(db.removeQuestion);


      app.route('/api/result')
        /*
        Parameters
          studentid = int
          sectionid = int
          questionid = int
          answer = string
        */
        .post(db.saveResults)

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
