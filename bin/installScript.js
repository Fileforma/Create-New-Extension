#! /usr/bin/env node
const {execSync} = require('child_process');
const os = require('os');


if(process.argv.length < 3)
{
	console.log("Failed: Please enter a name for your project\n");
	console.log("Usage: npx create-new-extension AmazingStartupName");
	process.exit(-1);
}

const run = command =>
{
	try
	{
		execSync(`${command}`, {stdio: 'inherit'});
	}
	catch(error)
	{
		console.log("Failed: ", error);
		return false;
	}
	return true
};

const startupName = process.argv[2];
const checkout = `git clone --depth 1 https://github.com/Fileforma/Create-New-Extension ${startupName}`;
const prepareInstall = `cd ${startupName} && cd BrowserExtension && npm install `;

const deleteGitLinux = `cd ${startupName} && rm -fr .git`;
const deleteBinLinux = `cd ${startupName} && rm -fr bin`;

const deleteGitWindows = `cd ${startupName} && rmdir /s /q .git`;
const deleteBinWindows = `cd ${startupName} && rmdir /s /q bin`;

const newRepoCommand = `cd ${startupName} && git init`;

const clonedRepo = run(checkout);
console.log("Cloning starter code from Fileforma");
if(!clonedRepo)
{
	process.exit(-1);
}

console.log("Clone Success!\nInstalling NPM dependencies\n");

const dependencies = run(prepareInstall);
if(!dependencies)
{
	process.exit(-1);
}


	
if(os.type() === 'Linux')
{
	const deletedGit = run(deleteGitLinux);
	if(!deletedGit){console.log("Git delete failed"); process.exit(-1);}
	
	const deletedBin = run(deleteBinLinux);
	if(!deletedBin){console.log("Bin delete failed"); process.exit(-1);}
	
	
	const newRepo = run(newRepoCommand);
	if(!newRepo){console.log("Git init failed"); process.exit(-1);}
	
	
}
else if(os.type() === 'Windows_NT')
{
	const deletedGit = run(deleteGitWindows);
	if(!deletedGit){console.log("Git delete failed"); process.exit(-1);}
	
	const deletedBin = run(deleteBinWindows);
	if(!deletedBin){console.log("Bin delete failed"); process.exit(-1);}
	
	
	const newRepo = run(newRepoCommand);
	if(!newRepo){console.log("Git init failed"); process.exit(-1);}
	

	console.log(`\nI don't have a windows laptop. I couldn't test the install process on windows. Please lmk if the installer works. Find me here : https://github.com/kibichomurage/create-new-startup/issues\n`);
}
console.log(`Success!\n\t1.cd ${startupName} \n 2. Pick Extension Type. 3. Run npm run dev`);


