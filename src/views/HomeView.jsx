import Logo from '../components/Logo';

function HomeView() {
  return (
    <div>
      <nav className='flex items-center justify-between px-2 py-2 lg:px-4'>
        <Logo />
        <p>Notes</p>
      </nav>
      <span>Notes App Dashboard</span>
    </div>
  );
}

export default HomeView;
