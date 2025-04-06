/** @type {import('next').NextConfig} */
const baseConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

// Merge user config dynamically
const loadConfig = async () => {
  let userConfig = {};
  try {
    const mod = await import('./v0-user-next.config.js'); // make sure this file exists
    userConfig = mod.default || {};
  } catch (e) {
    // No user config found or invalid — ignore
  }

  return mergeConfig(baseConfig, userConfig);
};

function mergeConfig(base, user) {
  const merged = { ...base };
  for (const key in user) {
    if (typeof base[key] === 'object' && !Array.isArray(base[key])) {
      merged[key] = { ...base[key], ...user[key] };
    } else {
      merged[key] = user[key];
    }
  }
  return merged;
}

export default await loadConfig();
