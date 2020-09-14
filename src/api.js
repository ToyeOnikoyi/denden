import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.density.io/v2/',
    headers: {
        Authorization: 'Bearer tok_KOcggRz4zULjCXCLHUkmRamnv1KLNnSxEzhTUDpqswL'
    }
})

