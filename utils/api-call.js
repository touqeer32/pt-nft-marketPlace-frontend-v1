import axios from "axios";
var tokenCountId = "6310919b5682966da6544ca3";
var response = {};

async function get(api, params) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${api}`,
      {
        params: params,
      }
    );
    // setNfts(data);
    if (data.status == 200) {
      response.status = 200;
      response.data = data;
      response.message = "";
    } else {
      response.status = 400;
      response.data = {};
      response.message = "";
    }

    return response;
  } catch (err) {
    console.log(err);
    response.status = 400;
    response.data = {};
    response.message = err;

    return response;
  }
}
async function put(api, params) {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${api}`,
      { _id: tokenCountId }
    );
    // setNfts(data);

    return data;
  } catch (err) {
    console.log(err);
    response.status = 400;
    response.data = {};
    response.message = err;

    return response;
  }
}
async function post(api, args) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}${api}`,
      args
    );
    return data;
  } catch (err) {
    console.log(err);
    response.status = 400;
    response.data = {};
    response.message = err;

    return response;
  }
}

module.exports = {
  get,
  put,
  post,
};
