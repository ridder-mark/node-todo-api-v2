const expect = require('expect');
const request = require('supertest');

const {
    app
} = require('./../server');
const {
    Todo
} = require('./../models/todo');

const todos = [{
    text: 'first test todo'
}, {
    text: 'second test todo'
}, {
    text: 'third test todo'
}];

beforeEach((done) => {
    Todo
        .remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => {
            done()
        })
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
                    expect(todos.length).toBe(4);
                    expect(todos[3].text).toBe(text);
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

                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                })

            })



    })

});

describe('GET /toodos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(3)
        })
        .end(done);
    });
});