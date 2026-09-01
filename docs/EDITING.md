# 如何更新网站内容

这份文档写给实验室成员。**不需要装任何软件，不需要会写代码**，全程在浏览器里完成。

改动保存后，网站会在 1–2 分钟内自动更新。

---

## 基本流程

1. 打开 GitHub 上的仓库
2. 找到要改的文件（下面有对照表）
3. 点文件右上角的铅笔图标 ✏️
4. 改内容
5. 拉到页面底部，点绿色的 **Commit changes**
6. 等 1–2 分钟，刷新网站

改错了不要紧 —— 每一次改动都有记录，随时能退回去。

---

## 改什么，在哪个文件

| 想改的东西 | 文件 |
|---|---|
| 加一篇论文 | `src/content/publications.yaml` |
| 加一个成员（学生/博后） | `src/content/people/` 下新建文件 |
| 发一条新闻 | `src/content/news/` 下新建文件 |
| 改研究方向的介绍 | `src/content/research/` 下对应文件 |
| 改招聘信息 | `src/content/openings/` 下对应文件 |
| 改实验室名字、PI 信息、联系方式、导航 | `src/config.ts` |
| 换首页那句大标题 | `src/config.ts` 里的 `hero` |

---

## 加一篇论文

打开 `src/content/publications.yaml`，在**最上面**加一段（注意缩进，用空格不要用 Tab）：

```yaml
- id: 一个唯一的英文短名-2026
  title: 论文标题
  authors: ['**Yun Chang**', 'Other Author']
  journal: 期刊名
  year: 2026
  doi: 10.1038/xxxxx
  type: article
  featured: false
```

几个说明：

- `id` 随便起，只要**不和别的重复**就行，建议用「关键词-年份」
- 作者名字外面套 `**` 表示是实验室成员，网页上会加粗
- `type` 可以是 `article` `review` `preprint` `protocol` `patent`
- `featured: true` 会让这篇出现在**首页**，一般只留 3–4 篇

> **不要手打整个论文列表。** 从 Google Scholar 或 EndNote 导出 `.bib` 文件发给建站的人，一次性转换，格式才会统一。

---

## 加一个成员

在 `src/content/people/` 里新建文件，文件名用英文小写加连字符，比如 `zhang-san.md`。

最简单的办法：打开 `_template.md`，复制里面全部内容，粘到新文件里再改。

```markdown
---
name: Zhang San
nameZh: 张三
role: phd
title: PhD Student
order: 10
photo: /images/people/zhang-san.jpg
email: zhang.san@connect.polyu.hk
joined: '2026'
supervisors:
  - yun-chang
interests:
  - CAR-NK cells
  - Biomaterials
draft: false
---

一两句话介绍：做什么，之前在哪里。
```

### 关键的两个字段

**`supervisors`（跟哪位老师）** —— 决定这个人出现在 People 页的哪一节。填**导师的
文件名去掉 `.md`**，现在可选的是：

| 填什么 | 对应老师 |
|---|---|
| `cheng-dong` | 董澄 |
| `yun-chang` | Yun Chang |
| `man-ting-au` | Man Ting Au |
| `bingyang-dai` | Bingyang Dai |

联合指导就写多个，这个人会**同时出现在两个组里**：

```yaml
supervisors:
  - yun-chang
  - bingyang-dai
```

> 名字**写错会导致构建失败**，Actions 里会明确告诉你哪个文件、哪个字段、错在哪个值。
> 这是故意的 —— 总比悄悄把学生分到错的老师名下强。构建失败时**网站还是旧版本，
> 不会挂掉**，改对再提交就行。

不填 `supervisors` 的人会被归到页面最后的「Group members」。

**`role`（职务）** —— 决定在导师那一节里排在哪一小组：

`postdoc` 博后 · `phd` 博士 · `mphil` 硕士 · `ra` 研究助理 ·
`visiting` 访问学者 · `undergrad` 本科生 · `staff` 行政

（`director` 和 `pi` 是老师专用的，学生不要填。）

### 其他说明

- `order` 数字越小排越前（在同一个小组内）
- **`draft: false` 一定要设**，写 `true` 的话页面上不会显示
- 毕业离开的人：加 `alumnus: true` 再写 `now: 现在在哪`，他会自动移到页面底部的
  Alumni 那一栏，**不用删文件**

### 照片规格（很重要）

- 竖版，比例 **4:5**（比如 1200 × 1500 像素）
- **背景统一**：最好全实验室找一面白墙，半小时集体拍完
- 文件放进 `public/images/people/`，文件名和 `photo:` 里写的一致

> 这一条不是挑剔。People 页面好不好看，八成取决于照片背景统一不统一。收到二十张背景各异的自拍，再好的排版也救不回来。

---

## 发一条新闻

在 `src/content/news/` 里新建文件，文件名建议 `2026-03-标题关键词.md`：

```markdown
---
title: 新闻标题
date: 2026-03-15
summary: 一句话摘要，会显示在列表页。
link: https://doi.org/xxxxx    # 可选，指向论文或报道
tags: ['publication']
draft: false
---

正文，可以写几段。
```

---

## 常见问题

**改完网站没变？**
等 1–2 分钟。还没变的话，去仓库的 **Actions** 标签页看看最新那次是不是红色 ❌ —— 红色说明格式写错了，点进去能看到哪一行有问题。

**网站突然打不开 / 变成空白？**
多半是 YAML 格式写坏了（少了引号、缩进用了 Tab）。去 Actions 页面看报错，或者在仓库的 commit 历史里点 **Revert** 退回上一版。

**标题里有冒号 `:` 报错？**
YAML 里冒号有特殊含义，整个标题用单引号包起来：

```yaml
title: '一个标题：带冒号的那种'
```

**缩进要用几个空格？**
跟着上下文对齐就行，**永远不要用 Tab 键**。
