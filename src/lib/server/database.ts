// In a real app, this data would live in a database,
// rather than in memory. But for now, we cheat.

type TTodo = {
	id: string;
	description: string;
	done: boolean;
};

type TDatabase = Map<number, TTodo[]>;

const db: TDatabase = new Map();

export function getTodos(userid: number) {
	return db.get(userid);
}

export function createTodo(userid: number, description: string) {
	if (description === '') {
		throw new Error('todo must have a description');
	}

	if (!db.has(userid)) {
		db.set(userid, []);
	}

	const todos = db.get(userid);

	if (todos?.find((todo) => todo.description === description)) {
		throw new Error('todos must be unique');
	}

	todos?.push({
		id: crypto.randomUUID(),
		description,
		done: false
	});
}

export function deleteTodo(userid: number, todoid: string) {
	const todos = db.get(userid);
	const index = todos?.findIndex((todo) => todo.id === todoid);

	if (index && index !== -1) {
		todos?.splice(index, 1);
	}
}
