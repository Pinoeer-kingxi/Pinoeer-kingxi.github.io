---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

我是林炜希，目前是西北工业大学计算机技术专业的在读硕士研究生。我的研究兴趣主要集中在**大模型优化**、**RAG（检索增强生成）系统**和**AI推理加速**等领域。

在学术和竞赛方面，我积极参与各类AI创新大赛，专注于解决大模型在实际应用中的性能瓶颈问题，特别是在MoE（Mixture of Experts）模型优化和全链路RAG系统设计方面积累了丰富的实践经验。


# 🔥 News
- *2025.10*: &nbsp;🎉🎉 全链路RAG方案设计项目持续进行中，实现了91%的Hit Rate和85%+的Factuality Score
- *2025.11*: &nbsp;🎉🎉 昇腾AI创新大赛 - MindSpore大模型优化项目完成，Prefill性能提升266%，总分353.7（基线220）
- *2025.09*: &nbsp;🎉🎉 获得昇思模型开发挑战赛 S1-MOE赛道银牌 

# 📝 Publications 

目前暂无已发表的论文，相关工作正在进行中。

# 🎖 Honors and Awards
- *2025.09* 昇思模型开发挑战赛 S1-MOE赛道银牌
- *2025* CHIP2025-面向中文电子病历的代谢性疾病出院用药推荐任务_算法大赛（排名：17/573）
- *2025* Higress AI 网关开发挑战赛 三等奖
- *本科期间* 国家奖学金、一等优秀奖学金
- *本科期间* 数维杯全国大学生数学建模竞赛本科生组一等奖 

# 📖 Educations
- *2025.09 - 至今*, 西北工业大学，计算机技术，硕士，计算机学院
- *2021.09 - 2025.07*, 陕西师范大学，软件工程，本科，计算机科学学院 

<span class='anchor' id='projects'></span>

# 💻 Projects

## 全链路 RAG 方案设计 —— 集成双重混合检索、自适应路由与 CRAG 动态纠错机制
*2025.10 - 至今*

**项目描述**: 针对 Higress 网关的复杂场景，设计并开发基于MCP的全链路增强型检索系统。解决了传统RAG系统在长文档检索中存在的"版本混淆"、"幻觉严重"及"响应延迟"三大痛点。

**核心职责与实施**:
1. 构建分层架构，包含 MCP Server 层负责协议路由，RAG Client 层负责编排，以及基础设施层集成 Milvus 和 LLM
2. 引入语义缓存机制，拦截高频问题，实现缓存命中请求 <50ms 的毫秒级响应，大幅降低 Token 消耗
3. 利用 Milvus 的 Boost Ranker 功能实现业务逻辑加权（如官方文档权重 x1.2），结合 BGE-M3 的稀疏与稠密向量双路召回，通过 RRF 算法进行融合，有效解决旧版本文档干扰问题
4. 实现 Corrective RAG 策略，构建 Retrieval Evaluator 对召回文档进行置信度打分。针对"存疑"或"错误"的检索结果，自动降级触发 Tavily Web Search 补充外部信息，构建高可靠的回答闭环
5. 定制 Higress Splitter，针对 Markdown 结构进行代码块保护与层级感知切分；利用 Milvus Partition Key 实现多版本/多租户数据的物理隔离

**项目成果**:
- Hit Rate 达到91%，其中针对官方文档的 Boost 策略使命中率从 60% 提升至 80%
- Factuality Score 超过 85%，大幅减少了大模型的幻觉生成
- 通过 Semantic Score (66%) 与 MRR (0.577) 的双重验证，证明了系统在复杂长尾问题上的优越性

## 昇腾AI创新大赛 - MindSpore大模型优化 (MoE赛道)
*2025.09 - 2025.11*

**任务**: 在 Ascend NPU 上优化 DeepSeek-16b/Qwen-2.7B MoE 模型的推理速度与显存占用。

**主要工作**:
- **瓶颈分析**: 识别出 MoE 模块计算占比高达 95%+，确定了"以空间换时间"和"串行转并行"的优化主线
- **Prefill 优化**: 提出 Pad-BMM-Gather 算法，利用 tensor_scatter_update 和批量矩阵乘法 (ops.bmm) 替代原生 Python 循环，实现专家计算的完全向量化，Prefill 性能提升 266%
- **Decode 优化**: 设计动态权重缓存机制，将离散的专家权重重组为连续内存，优化显存访问局部性；配合 float32 混合精度策略，解决了并行计算的精度溢出问题

**结果**: 最终总分 353.7 (基线 220)，在降低 17% 显存峰值的同时，实现了推理速度的倍数级跃升。