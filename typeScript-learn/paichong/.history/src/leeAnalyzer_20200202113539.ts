/*
 * @Author: your name
 * @Date: 2020-02-02 11:34:06
 * @LastEditTime: 2020-02-02 11:35:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \paichong\src\leeAnalyzer.ts
 */
import { Analyzer } from './crowller';

export default class LeeAnalyzer implements Analyzer {
  public analyze(html: string, filePath: string) {
    return html;
  }
}