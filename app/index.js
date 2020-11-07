var Generator = require('yeoman-generator');
const fs = require('fs');
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }
  async ProjectName() {
    const answer = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
    ]);
    const redisPrefix =
      `${answer.projectName
        .split('-')
        .map((str) => str[0])
        .join('')}:` || `${this.appname}:`;
    this.options = {
      projectName: answer.projectName,
      redis: {
        prefix: redisPrefix,
      },
    };

    this.log('App name : ', this.options.projectName);
    this.log('Redis prefix : ', this.options.redis.prefix);
  }
  async Database() {
    const answer = await this.prompt([
      {
        type: 'checkbox',
        name: 'database',
        message: 'Choose database you use',
        choices: ['MySQL', 'Redis'],
        // default: this.appname, // Default to current folder name
      },
    ]);
    this.log(answer);
    this.options.database = answer.database;
    // this.log('Database result : ', this.options.database);
    // this.log(this.templatePath());
    // this.log(this.destinationPath());
  }
  writing() {
    this.log('Finnal options : ' + JSON.stringify(this.options));
    this.destinationRoot(this.options.projectName);
    this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), this.options);
  }
};
