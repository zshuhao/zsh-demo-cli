import symbol from 'log-symbols'; // 日志彩色符号，用来显示√ 或 × 等的图标
import chalk from 'chalk'; // 颜色插件，用来修改命令行输出样式，通过颜色区分 info、error 日志，清晰直观
import ora from 'ora'; // 用于显示加载中的效果

import {
    notExistFold,
    prompt,
    downloadTemplate,
    updateJsonFile
} from './util';

const create = async (projectName) => {
    if (projectName === undefined) {
        console.log(symbol.error, chalk.red('创建项目的时候，请输入项目名'))
    } else {
        notExistFold(projectName).then(() => {

            prompt().then((answer) => {
                const loading = ora('模版下载中...')
                loading.start('模版下载中...')

                let Api = ''
                switch (answer.frame) {
                    case 'vue':
                        Api = 'direct:https://github.com/zshuhao/vue-element-tree-transfer.git'
                        break;
                
                    default:
                        break;
                }

                downloadTemplate(projectName, Api).then(() => {
                    loading.succeed('模版下载完成...')

                    const fileName = `${projectName}/package.json`;
                    answer.name = projectName;
                    updateJsonFile(fileName, answer)
                    .then(() => {
                        console.log(symbol.success, chalk.green('配置文件更新完的。'));
                    })

                }, () => {
                    loading.fail('模板下载失败')
                })
            })
        })
    }
}

module.exports = create;