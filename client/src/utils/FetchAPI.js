import axios from 'axios';

const FetchAPI = axios.create({ fetchUrl: '/api/v1' });

export default FetchAPI;
