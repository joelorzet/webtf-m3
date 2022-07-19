// const bodyParser = require("body-parser");
const express = require('express');
const port = 3000;

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post('/posts', (req, res) => {
	const { author, title, contents } = req.body;
	const Post = { author, title, contents, id: id++ };

	if (!author || !title || !contents) {
		const error = { error: 'No se recibieron los parámetros necesarios para crear el Post' };
		res.status(STATUS_USER_ERROR).json(error);
	} else {
		posts.push(Post);

		res.status(200).json(Post);
	}
});

server.post('/posts/author/:author', (req, res) => {
	const { author } = req.params;
	const { title, contents } = req.body;

	if (!author || !title || !contents) {
		const error = { error: 'No se recibieron los parámetros necesarios para crear el Post' };

		res.status(STATUS_USER_ERROR).json(error);
	} else {
		const post = { author, title, contents, id: id++ };

		posts.push(post);

		res.json(post);
	}
});

server.get('/posts', (req, res) => {
	const { term } = req.query;

	if (!term) {
		res.json(posts);
	} else {
		const filteredPost = posts.filter((post) => post.title.includes(term) || post.contents.includes(term));

		res.json(filteredPost);
	}
});

server.get('/posts/:author', (req, res) => {
	let { author } = req.params;

	if (!author) {
		res.status(STATUS_USER_ERROR).json({ error: 'No me llegó el autor' });
	} else {
		let filteredPosts = posts.filter(
			(post) => post.author.toLowerCase() === author.replace('%20', ' ').toLowerCase()
		);
		if (!filteredPosts.length) {
			res.status(STATUS_USER_ERROR).json({ error: 'No existe ningun post del autor indicado' });
		} else {
			res.json(filteredPosts);
		}
	}
});

server.get('/posts/:author/:title', (req, res) => {
	let { author, title } = req.params;

	if (author.length && title) {
		let result = posts.filter(
			(post) =>
				post.author.toLowerCase() === author.replace('%20', ' ').toLowerCase() &&
				post.title.toLowerCase() === title.replace('%20', ' ').toLowerCase()
		);
		if (result.length) {
			res.json(result);
		} else {
			res
				.status(STATUS_USER_ERROR)
				.json({ error: 'No existe ningun post con dicho titulo y autor indicado' });
		}
	} else {
		res.status(STATUS_USER_ERROR).json({ error: 'No se recibio author ni title' });
	}
});

server.put('/posts', (req, res) => {
	let { id, title, contents } = req.body;

	id = parseInt(id);

	if (!id || !contents || !title) {
		res
			.status(STATUS_USER_ERROR)
			.json({ error: 'No se recibieron los parámetros necesarios para modificar el Post' });
	} else {
		let postFinded = posts.find((post) => post.id === id);

		if (!postFinded) {
			res.status(STATUS_USER_ERROR).json({ error: 'No se encontro el post' });
		} else {
			postFinded.title = title;
			postFinded.contents = contents;

			res.json(postFinded);
		}
	}
});

server.delete('/posts', (req, res) => {
	const { id } = req.body;

	let post = posts.find((post) => post.id === id);

	if (!id || !post) {
		res.status(STATUS_USER_ERROR).json({ error: 'Mensaje de error' });
	} else {
		posts = posts.filter((post) => post.id !== id);
		res.json({ success: true });
	}
});

server.delete('/author', (req, res) => {
	let { author } = req.body;

	let deletedPost = posts.filter((post) => post.author === author);

	if (!deletedPost.length) {
		res.status(STATUS_USER_ERROR).json({ error: 'No existe el autor indicado' });
	} else {
		if (!deletedPost) {
			res.status(STATUS_USER_ERROR).json({ error: 'No existe el autor indicado' });
		} else {
			posts = posts.filter((post) => post.author !== author);
			res.json(deletedPost);
		}
	}
});

module.exports = { posts, server, port };
