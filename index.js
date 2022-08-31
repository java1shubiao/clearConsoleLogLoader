const execSync = require('child_process').execSync;
const inquirer = require('inquirer')
const fs = require('fs')
const chalk = require('chalk')


let template = {
  projectName: ''
}
try {

  const questions = [
    {
      type: 'input',
      name: 'proName',
      message: '项目名称'
    },
    {
      type: 'input',
      name: 'type',
      message: 'commit类型'
    },
    {
      type: 'input',
      name: 'name',
      message: 'commit名称'
    }
  ]
  const data = fs.readFileSync('./git-cli.json', 'utf8')
  const parseJsonData = JSON.parse(data)
  let hasProjectNameInJson = false
  if (parseJsonData.projectName) {
    console.log(chalk.red.bold.bgWhite('从git-cli.json获取项目名'))
    questions.splice(0, 1)
    hasProjectNameInJson = true
  }

  inquirer.prompt(questions).then(answers => {
    const commitType = answers['type'] || 'feat'
    const commitName = answers['name']
    let projectName = ''
    if (hasProjectNameInJson) {
      projectName = parseJsonData.projectName
    } else {
      projectName = answers['proName']
      template.projectName = projectName
      fs.writeFileSync('./git-cli.json', JSON.stringify(template))
    }
    
    execSync('git pull')
    console.log(chalk.red.bold.bgWhite('手动选择commit文件'))
    execSync(`git commit -m "${commitType}: [${projectName}] ${commitName}"`, {encoding: 'utf8'});
    execSync('git push')
  })
  
} catch (err) {
  console.log('execute error：');
  console.log(err.toString());
}
