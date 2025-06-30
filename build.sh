# Build to correct file (after switching out global to globalThis with  sed)
#
# If you're asking *why* that's needed, some dependencies use global, and this is just to make it
# also work on web.
esbuild --bundle src/mod.ts | sed s/global/globalThis/g > sandboxels/mods/fancy_loader.js

# Show output file size
echo "Size:"
du -h sandboxels/mods/fancy_loader.js