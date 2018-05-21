const apiUrl = "http://localhost:3001"
const apiHeaders = 
    { 
        'Accept' : 'application/json',
        'Authorization': 'whatever-you-want', 
        'Content-Type': 'application/json' 
    }
    

// Categories
export const getCategories = () => {
    return fetch(`${apiUrl}/categories`, { headers: apiHeaders })
    .then( response => response.json() )
    .then( data => data.categories )
}

// Posts
export const getPost = id => {
    return fetch( `${apiUrl}/posts/${id}`, { headers: apiHeaders } )
    .then( response => response.json() )
    .then( data => data )
}

export const getPosts = category => {
    const url = category 
    ? `${apiUrl}/${category}/posts`
    : `${apiUrl}/posts`

    return fetch( url, { headers: apiHeaders } )
    .then( response => response.json() )
    .then( response => response )
}

export const getPostsByCategory = category => {
    return fetch( `${apiUrl}/${category}/posts`, { headers: apiHeaders } )
    .then( response => response.json() )
    .then( response => { response } )
}

export const addPost = post => {
    const data = {
            ...post,
            "timestamp": Date.now(),
    }
    return fetch( `${apiUrl}/posts`, {          
        method: "POST",
        headers: apiHeaders,
        mode: "cors",
        body: JSON.stringify(data),
    })
    .then( response => response.json() )
    .then( data => data )
}

export const deletePost = id => {
    return fetch( `${apiUrl}/posts/${id}`, {
        method: "DELETE",
        headers: apiHeaders,
    })
    .then( response => response.json() )
    .then( data => data )
}

export const editPost = payload => {
    fetch( `${apiUrl}/posts/${payload.id}`, {          
        method: "PUT",
        headers: apiHeaders,
        mode: "cors",
        body: JSON.stringify({
            ...payload,
            "author": payload.author,
            "body": payload.body,
            "category": payload.category,
            "deleted": false,
            "id": Date.now(),
            "timestamp": Date.now(),
            "title": payload.title,
            "voteScore": 0,
        })
    })
    .then( response => response.json() )
    .then( data => data )
}

export const updatePost = payload => {
    fetch( `${apiUrl}/posts/${payload.id}`, {          
        method: "PUT",
        headers: apiHeaders,
        mode: "cors",
        body: JSON.stringify({ payload })
    })
    .then( response => response.json() )
    .then( data => data )
}

export const votePost = ( id, vote ) => {
    return fetch( `${apiUrl}/posts/${id}`, {          
        method: "POST",
        headers: apiHeaders,
        mode: "cors",
        body: JSON.stringify({ option: vote })
    })
    .then( response => response.json() )
    .then( data => data )
}


// Comments
export const addComment = post => {
    const data = {
            ...post,
            "timestamp": Date.now(),
    }

    return fetch( `${apiUrl}/comments`, {          
        method: "POST",
        headers: apiHeaders,
        mode: "cors",
        body: JSON.stringify(data),
    })
    .then( response => response.json() )
    .then( data => data )
}

export const deleteComment = id => {
    return fetch( `${apiUrl}/comments/${id}`, {          
        method: "DELETE",
        headers: apiHeaders,
    })
    .then( response => response.json() )
    .then( data => data )
}

export const editComment = comment => {
    return fetch( `${apiUrl}/comments/${comment.id}`, {
        headers: apiHeaders,
        method: "PUT",
        body: JSON.stringify({
            ...comment,
        })
    })
    .then( response => response.json() )
    .then( response => response )
}

export const getComment = id => {
    return fetch( `${apiUrl}/comments/${id}`, { headers: apiHeaders })
    .then( response => response.json() )
    .then( response => response )
}


export const getComments = id => {
    console.log(id)
    return fetch( `${apiUrl}/posts/${id}/comments`, { headers: apiHeaders } )
    .then( response => response.json() )
    .then( data => data )
}

export const updateComment = payload => {
    fetch( `${apiUrl}/comments/${payload.id}`, {          
        method: "PUT",
        headers: apiHeaders,
        mode: "cors",
        body: JSON.stringify({ payload })
    })
    .then( response => response.json() )
    .then( data => data )
}

export const voteComment = ( id, vote ) => {
    return fetch( `${apiUrl}/comments/${id}`, {          
        method: "POST",
        headers: apiHeaders,
        mode: "cors",
        body: JSON.stringify({ option: vote })
    })
    .then( response => response.json() )
    .then( data => data )
}




