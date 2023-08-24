'use strict';
const semver = require('semver')
const urlJoin = require('url-join')
const axios = require('axios')

function getNpmInfo(npmName, registry) {
  if(!npmName){
      return null
  }
  const registryUrl = registry || getdefaultRegistryUrl()
  const npmInfoUrl = urlJoin(registryUrl, npmName)
  return axios.get(npmInfoUrl)
  .then(res=>{
    if(res.status===200){
      return res.data
    }
    return null
  }).catch(err=>{
    return Promise.reject(err)
  })
    
}



function getdefaultRegistryUrl(isOrigal=false) {
  return isOrigal ? 'https://registry.npmjs.com' : 'https://registry.npmmirror.com'
}

async function getNpmVersions(npmName, registry) {
  const data = await getNpmInfo(npmName, registry)
  if(data){
    return Object.keys(data.versions)
  }
  return []
}

async function getSevmerVersion(baseVersion, versions) {
  versions = versions
  .filter(version=>{
    semver.satisfies(`^${baseVersion}`, version)
  })
  .sort((a,b)=>{
    return semver.gt(a, b)
  })
}

async function getNpmSevmerVersion(baseVersion, npmName, registry) {
  const versions = await getNpmVersions(npmName, registry)
  const newVersion=  await getSevmerVersion(baseVersion, versions)
  if(newVersion&&newVersion.length>0){
    return targetVers[0]
  }
  
}
module.exports = {
  getNpmInfo,
  getNpmVersions,
  getNpmSevmerVersion
};
