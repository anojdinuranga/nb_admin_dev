const axios    = require('axios');
const FormData = require('form-data');
const response = require('./response');

const post = async (url, data, token) => {
  return new Promise((resolve, reject) => {
      axios.post(url, data, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(result => {
          resolve(response.success("0200", result.data));
      })
      .catch(error => {
          resolve(response.error("0000", error));
      });
  });
}


/* const post = async (url, data) => {

    return new Promise((resolve) => {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
  
      axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((result) => {
          resolve(response.success('0200', result.data));
        })
        .catch((error) => {
          resolve(response.error('0000', error));
        });
    });

}; */
  

const get = async (url, token) => {
  return new Promise((resolve, reject) => {
      axios.get(url, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(result => {
          resolve(response.success("0200", result.data));
      })
      .catch(error => {
          resolve(response.error("0000", error));
      });
  });
}


module.exports = {
    post,
    get
}