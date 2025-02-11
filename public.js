const git = require('simple-git')
const colors = require('colors')
const path = 'dist'
const repo = 'https://github.com/showzyl/resume.git'

console.log(`Start public to your git repo[${repo}]\nPlease wait ...`.green)

async function deployToGit() {
  try {
    const gitClient = git(path)
    await gitClient.init()
    await gitClient.add('./*')
    await gitClient.commit("feat: build file") 
    await gitClient.addRemote('origin', repo)
    await gitClient.push(['-f', 'origin', 'main'])
    console.log("Push to main success")
    
    await gitClient.checkoutLocalBranch('gh-pages')
    console.log('Checkout to branch gh-pages')
    
    await gitClient.push(['-f', 'origin', 'gh-pages'])
    await gitClient.checkout('main')
    console.log('Finish public, back to branch main')
  } catch (err) {
    console.error('Deploy failed:', err)
  }
}

deployToGit()
