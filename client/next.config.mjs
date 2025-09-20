import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: true,
});

export default withBundleAnalyzer({
  reactStrictMode: true,
});
