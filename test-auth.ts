import fetch from 'node-fetch';

const API_BASE_URL = 'https://api.seliseblocks.com';
const BLOCKS_KEY = 'Dde35c001de5a49f682d2705db22fc4b5';

async function test(path) {
  const res = await fetch(`${API_BASE_URL}/idp/v1/${path}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-blocks-key': BLOCKS_KEY }
  });
  console.log(path, res.status, await res.text());
}

async function run() {
  await test('User/Gets');
  await test('Users/Gets');
  await test('User/GetUsers');
  await test('Role/Gets');
  await test('Permission/Gets');
}
run();
