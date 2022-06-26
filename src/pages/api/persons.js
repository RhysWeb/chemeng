import prisma from '../../lib/prisma';

// Note that the pscale database is called 'teachers'
// So if you want to connect to it from the Command Line you use:
// pscale connect teachers main --port 3309

// You can then manually add entries to it from Bash with:
// npx prisma studio

export default async function assetHandler(req, res) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const persons = await prisma.person.findMany();
				res.status(200).json(persons);
			} catch (e) {
				console.error('Request error', e);
				res.status(500).json({ error: 'Error fetching persons' });
			}
			break;
		case 'POST':
			try {
				return await createPerson(req, res);
			} catch (e) {
				console.log('placeholder');
			}
		//this delete is copilot
		case 'DELETE':
			try {
				const { id } = req.params;
				await prisma.person.delete({ where: { id } });
			} catch (e) {
				console.error('Request error', e);
			}
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}

async function createPerson(req, res) {
	const body = req.body;
	try {
		const newEntry = await prisma.person.create({
			data: {
				name: body.name,
				email: body.email,
				age: body.age,
			},
		});
		return res.status(200).json(newEntry, { success: true });
	} catch (error) {
		console.error('Request error', error);
		res.status(500).json({ error: 'Error creating person', success: false });
	}
}
