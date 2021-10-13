require('dotenv').config()
const API_HOST=process.env.REACT_APP_API_HOST
async function getArticles() {
    const res = await fetch(API_HOST, {
        method: 'GET',
        headers:
        {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(
            (result) => {
                return result;
            },
            (error) => {
                return error;
            }
        )
    return res;
}

async function createArticle(data) {
    const res = await fetch(API_HOST, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:
        {
            'Content-Type': 'application/json'
        }
    });
    return res;
}

async function updateArticleById(data) {
    const res = await fetch(API_HOST + '/' + data._id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:
        {
            'Content-Type': 'application/json'
        }
    })
    return res;
}

async function deleteArticleById(id) {
    const res = await fetch(API_HOST + '/' + id, {
        method: 'DELETE',
        headers:
        {
            'Content-Type': 'application/json'
        }
    })
    return res;
}

export {
    getArticles,
    createArticle,
    updateArticleById,
    deleteArticleById,
}