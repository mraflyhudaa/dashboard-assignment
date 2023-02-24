import Barang from './barang';

function Home() {
  return <Barang />;
}

Home.requiresAuth = true;
Home.redirectUnauthenticated = '/login';

export default Home;
