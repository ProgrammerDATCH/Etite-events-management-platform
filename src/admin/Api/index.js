import axios from 'axios';
import { serverLink } from '../../components/common'

const BASE_URL = `${serverLink}api`;
async function callAPI(endpoint, method, data = null) {
  try {
    let token = '';
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(row => row.startsWith('adminToken='));
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


async function adminLoginAPI(email, password) {
  return callAPI('/admin/login', 'post', { email, password });
}

async function adminCurrentUserAPI() {
  return callAPI('/admin/check', 'post');
}


async function addEventApi(title, date, location, maxTickets, image) {
  return callAPI('/event/add', 'post', { title, date, location, maxTickets, image});
}

async function updateEventApi(id, title, date, location, maxTickets) {
  return callAPI('/event/update', 'patch', { id, title, date, location, maxTickets});
}

async function eventsApi() {
  return callAPI('/event/events', 'get');
}

async function ticketsApi(eventId) {
  return callAPI(`/ticket/tickets/${eventId}`, 'get');
}

async function getAllUsersApi() {
  return callAPI('/user/users', 'get');
}

async function getDashboardData() {
  return callAPI('/admin/dashboard', 'get');
}

async function changeTicketApi(id, status){
  return callAPI('/ticket/updateStatus', 'patch', {id, status})
}

async function deleteTicket(id, status){
  return callAPI('/ticket/deleteTicket', 'delete', {id})
}

async function deleteEventApi(id, status){
  return callAPI('/event/delete', 'delete', {id})
}

async function getEventByIdApi(id){
  return callAPI(`/event/event/${id}`, 'get')
}


export { adminLoginAPI, addEventApi, eventsApi, ticketsApi, adminCurrentUserAPI, getAllUsersApi, getDashboardData, deleteTicket, changeTicketApi, deleteEventApi, getEventByIdApi, updateEventApi };