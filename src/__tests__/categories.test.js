'use strict';

const { server } = require('../server.js');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);

describe('Categories API Test', () => {
    it('post a new categorie item', () => {
        let obj = { _id: '1', name: 'Test 1 categories' };
        return mockRequest.post('/api/v1/categories')
            .send(obj)
            .then(data => {
                // console.log('***********', data.body);
                let record = data.body;
                Object.keys(obj).forEach(key => {
                    expect(record[key]).toEqual(obj[key]);
                });
            });
    });
    it('respond properly to a get request to /api/v1/categories', () => {
        let obj = {  _id: '2', name: 'Test 1 categories' };
        return mockRequest
            .get('/api/v1/categories')
            .then(results => {
                expect(results.status).toBe(200);
                expect(typeof results.body).toBe('object');
            });
    });

    it('respond properly to a delete request to /api/v1/categories/:id', () => {
        return mockRequest
            .post('/api/v1/categories')
            .send({ _id: '3', name: 'TEST 3' })
            .then(data => {
                // console.log(data.body)
                return mockRequest
                    .delete(`/api/v1/categories/:${data.body.id}`)
                    .send({ _id: '3', name: 'TEST 3' })
                    .then(results => {
                        // console.log('************************', results.body);
                        expect(results.status).toBe(200);
                        expect(results.body.data).toBeNull();
                        expect(results.body.msg).toEqual('Item is deleted');
                    });
            });
    });
    it('respond properly to a update request to /api/v1/categories/:id', () => {
        let obj = { _id: '4', name: 'Test 4 categories' };
        return mockRequest.post('/api/v1/categories')
            .send(obj)
            .then(data => {
                console.log(data.body)
                let id = parseInt(data.body._id)
                return mockRequest.put(`/api/v1/categories/:${id}`)
                .send({name: 'TEST 4 IS UPDATED', id: '4'})
                .then(category => {
                    // console.log(category.body._id)
                return mockRequest.get(`/api/v1/categories/:${id}`)
                .then(results=>{
                    console.log(results)
                        expect(results.status).toBe(200);
                        expect(results.body.name).toEqual('TEST 4 IS UPDATED');
                        expect(results.body._id).toEqual('4');
                    });
            });
    });
});
});