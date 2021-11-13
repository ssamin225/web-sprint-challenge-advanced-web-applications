import axiosWithAuth from './../utils/axiosWithAuth';

const articleService = () => {
    return axiosWithAuth().get('/articles')
        .then(res => {
            return (res.data);
        }).catch(err => {
            console.log(err);
        })
}

export default articleService;

//Task List:
//1. Complete articleServices. This module should make an authenticated call and return an array of those articles.