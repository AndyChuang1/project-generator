var Generator = require('yeoman-generator');
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }
  async ProjectName() {
    this.options = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
    ]);
    this.log('App name : ', this.options);
  }
  async Database() {
    this.options = await this.prompt([
      {
        type: 'checkbox',
        name: 'database',
        message: 'Choose database you use',
        choices: ['MySQL', 'Redis'],
        // default: this.appname, // Default to current folder name
      },
    ]);
    this.log('App name : ', this.options.database);
  }
};
