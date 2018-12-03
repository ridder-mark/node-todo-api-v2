const expect = require('expect');
const request = require('supertest');

const {
    app
} = require('./../server');
const {
    Todo
} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => {
        done()
    });
});

describe('POST /todos', () => {

    it('should create a new todo', (done) => {

        var text = 'test todo text';

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            // custom expect call to make assertions about the body of response
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    console.log(e);
                });


            });

    });

    it('should not create todo with invalid data', (done) => {

        var text = '';

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(400)
            .end((err, res) => {

                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                })

            })



    })

});