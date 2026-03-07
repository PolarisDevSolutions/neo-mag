import fs from 'fs';
import path from 'path';

/**
 * This script synchronizes files from the 'overrides/cms-core' directory 
 * into the 'vendor/cms-core' submodule directory.
 * 
 * This is used to apply project-specific CMS fixes during the build process
 * because we do not have push access to the submodule's remote repository.
 */

const OVERRIDES_DIR = path.join(process.cwd(), 'overrides/cms-core');
const TARGET_DIR = path.join(process.cwd(), 'vendor/cms-core');

function walkDir(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

function syncOverrides() {
  console.log('Applying project-specific CMS fixes to vendor/cms-core...');

  if (!fs.existsSync(OVERRIDES_DIR)) {
    console.log('No overrides directory found. Skipping.');
    return;
  }

  if (!fs.existsSync(TARGET_DIR)) {
    console.error('Target directory vendor/cms-core not found! Make sure submodules are initialized.');
    process.exit(1);
  }

  walkDir(OVERRIDES_DIR, (filePath) => {
    const relativePath = path.relative(OVERRIDES_DIR, filePath);
    const targetPath = path.join(TARGET_DIR, relativePath);

    // Ensure target directory exists
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy file
    fs.copyFileSync(filePath, targetPath);
    console.log(`  Overwritten: ${relativePath}`);
  });

  console.log('CMS fixes applied successfully.');
}

try {
  syncOverrides();
} catch (error) {
  console.error('Failed to apply CMS fixes:', error);
  process.exit(1);
}
