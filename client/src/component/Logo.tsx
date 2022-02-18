import { FaCloudSunRain } from 'react-icons/fa';

import '../style/component/Logo.css';

function Logo() {
  return (
    <main id="logo" title="Weathered, a simple and free weather app">
      <FaCloudSunRain size={90}></FaCloudSunRain>
      <div id="texts">
        <span id="name">Weathered</span>
        <span id="description">A simple and free weather app</span>
      </div>
    </main>
  );
}

export default Logo;