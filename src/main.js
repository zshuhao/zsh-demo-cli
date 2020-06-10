import program from 'commander';
import create from './create'; // 项目创建

const actionMap = {
    create: {
        description: '创建一个新项目', // 描述
        usages: ['zd create projectName'], // 使用方法
        alias: 'c' // 命令简称
    }
}

Object.keys(actionMap).forEach(action => {
    // if (actionMap[action].options) {

    // }

    program
        .command(action)
        .description(actionMap[action].description)
        .alias(actionMap[action].alias)
        .action(() => {
            switch (action) {
                case 'create':
                    create(...process.argv.slice(3));
                    break;
                default:
                    break;
            }
        })
})

// 项目版本
program
    .version(require('../package.json').version, '-v --version')
    .parse(process.argv);


// little-bird-cli命令后不带参数的时候，输出帮助信息
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
