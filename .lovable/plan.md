Add Bing Webmaster verification file and publish to kaimec.com

1. Create `public/BingSiteAuth.xml` with the exact Bing-provided contents:
```xml
<?xml version="1.0"?>
<users>
	<user>9062D2B76AF53782D1E95AACBB30B697</user>
</users>
```

2. Verify the file is placed in the `public/` folder so Vite/Lovable serves it as a plain static file at `https://kaimec.com/BingSiteAuth.xml` without React routing.

3. Run a security scan check before publishing, then publish the site so the verification file is live on the custom domain `https://kaimec.com`.

4. Confirm the file is accessible at `https://kaimec.com/BingSiteAuth.xml` by fetching the live URL.