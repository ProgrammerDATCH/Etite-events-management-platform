import axios from 'axios';
import { serverLink } from '../common'

const BASE_URL = `${serverLink}api`;

async function callAPI(endpoint, method, data = null) {
  try {
    let token = '';
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(row => row.startsWith('userToken='));
    if (tokenCookie) {
      token = tokenCookie.split('=')[1];
    }
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 30000,
    });
    const { status, message } = response.data;
    return { status, message };
  } catch (error) {
    if (error.response) {
      return { status: false, message: error.response.data.message || 'Server error occurred.' };
    } else if (error.request) {
      return { status: false, message: 'Server is offline. Please try again later.' };
    } else {
      return { status: false, message: 'An error occurred. Please try again later.' };
    }
  }
}


async function loginAPI(email, password) {
  return callAPI('/user/login', 'post', { email, password });
}

async function registerAPI(name, email, password) {
  return callAPI('/user/register', 'post', { name, email, password });
}

async function currentUserAPI() {
  return callAPI('/user/check', 'post');
}

async function eventsApi() {
  return callAPI('/event/events', 'get');
}

async function ticketsAPI(eventId, amount) {
  return callAPI('/ticket/add', 'post', { eventId, amount });
}

async function userTicketsAPI() {
  return callAPI('/ticket/userTickets', 'get');
}

async function deleteUserTicketApi(id, status){
  return callAPI('/ticket/delete', 'delete', {id})
}


export { loginAPI, registerAPI, eventsApi, currentUserAPI, ticketsAPI, userTicketsAPI, deleteUserTicketApi };