const BASE_URL = 'http://localhost:8080/';

export async function carregar_est_areas(est) {
    try {
        const response = await axios.get(`${BASE_URL}/areas/${est}`);
        return response.data; // Retorna a resposta para uso posterior
    } catch (error) {
        console.error('Erro ao consultar est:', error.response ? error.response.data : error.message);
        throw error; // Lança o erro para que possa ser tratado no front-end
    }
}

export async function carregar_est_area(est) {
    try {
        const response = await axios.get(`${BASE_URL}/area/${est}`);
        console.log(response);
        return response.data; // Retorna a resposta para uso posterior
    } catch (error) {
        console.error('Erro ao consultar est:', error.response ? error.response.data : error.message);
        throw error; // Lança o erro para que possa ser tratado no front-end
    }
}


export async function carregar_topicos(id_value) {
    try {
        const response = await axios.get(`${BASE_URL}/topicos/${id_value}`);
        return response.data; // Retorna a resposta para uso posterior
    } catch (error) {
        console.error('Erro ao consultar est:', error.response ? error.response.data : error.message);
        throw error; // Lança o erro para que possa ser tratado no front-end
    }
}

export async function carregar_topico(id_value) {
    try {
        const response = await axios.get(`${BASE_URL}/topico/${id_value}`);
        return response.data; // Retorna a resposta para uso posterior
    } catch (error) {
        console.error('Erro ao consultar est:', error.response ? error.response.data : error.message);
        throw error; // Lança o erro para que possa ser tratado no front-end
    }
}

export async function carregar_subtopicos(id_topico) {
    try {
        const response = await axios.get(`${BASE_URL}/subtopicos/${id_topico}`);
        return response.data; // Retorna a resposta para uso posterior
    } catch (error) {
        console.error('Erro ao consultar est:', error.response ? error.response.data : error.message);
        throw error; // Lança o erro para que possa ser tratado no front-end
    }
}


export async function criarTopico(nome, id) {
    try {
        const response = await axios.post(`${BASE_URL}/topicos`, {
            id_est: id,
            nome: nome
        });
        return response.data // Retorna a resposta para uso posterior
    } catch (error) {
        console.error('Erro ao criar tópico:', error.response ? error.response.data : error.message);
        throw error; // Lança o erro para que possa ser tratado no front-end
    }
}

export async function criarSubtopico(nome, id) {
    try {
        const response = await axios.post(`${BASE_URL}/subtopicos`, {
            id_topico: id,
            nome: nome
        });
        return response.data; // Retorna a resposta para uso posterior
    } catch (error) {
        console.error('Erro ao criar subtópico:', error.response ? error.response.data : error.message);
        throw error; // Lança o erro para que possa ser tratado no front-end
    }
}

export async function deletarTopico(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/topicos/${id}`);
        console.log(response);
        return response.data; // Retorna a resposta para uso posterior
    } catch (error) {
        console.error('Erro ao consultar est:', error.response ? error.response.data : error.message);
        throw error; // Lança o erro para que possa ser tratado no front-end
    }

}

export async function deletarSubtopicos(id) {
    fetch(`${BASE_URL}/subtopicos/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Deleção bem-sucedida!');
        })
        .catch(error => {
            console.error('Houve um problema com a solicitação:', error);
        });
}

export async function deletarSubtopico(id) {
    fetch(`${BASE_URL}/subtopico/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Deleção bem-sucedida!');
        })
        .catch(error => {
            console.error('Houve um problema com a solicitação:', error);
        });
}
