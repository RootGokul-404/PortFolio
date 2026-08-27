import React from "react";
import { Article } from "@/data/portfolioData";
import { ArrowUpRight, BookOpen, Calendar, Clock } from "lucide-react";

interface ArticlesSectionProps {
  articles: Article[];
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section id="writing" className="border-b border-white/5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-mono text-xs text-[#c7ff40]">
          <span>// 04_IMPLEMENTATION_NOTES</span>
        </div>
        <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Technical Writing & Engineering Observations
        </h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Reflections on software boundaries, embedded design trade-offs, and architectural clarity.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {articles.map((article) => {
            let tagList: string[] = [];
            if (Array.isArray(article.tags)) {
              tagList = article.tags;
            } else if (typeof article.tags === "string") {
              try {
                tagList = JSON.parse(article.tags);
              } catch {
                tagList = [article.tags];
              }
            }

            return (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-lg border border-white/10 bg-[#0c120f]/80 p-7 transition-all duration-300 hover:border-[#c7ff40]/50 hover:bg-[#101814] hover:shadow-[0_0_25px_rgba(199,255,64,0.1)]"
              >
                <div>
                  <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
                    {article.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span>{article.publishedAt}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-white transition-colors group-hover:text-[#c7ff40]">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/5 pt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {tagList.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-white/5 bg-[#141e18] px-2 py-0.5 font-mono text-[10px] text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-end">
                    <span className="flex items-center gap-1 font-mono text-xs font-semibold text-[#c7ff40] transition-transform group-hover:translate-x-1">
                      <span>READ NOTE</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
