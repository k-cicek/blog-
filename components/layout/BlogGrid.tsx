import Image from "next/image";

const posts = [
    {
        id: 1,
        category: "Technology",
        title: "Will Artificial Intelligence Make Your Coffee Next?",
        excerpt: "AI’s impact on daily life has officially gone beyond science fiction.",
        date: "2026-01-10",
        readingTime: "4 min"
    },
    {
        id: 2,
        category: "Software",
        title: "The Harsh Truth About Clean Code in JavaScript",
        excerpt: "Small but painful reminders for those who ignore code readability.",
        date: "2026-01-12",
        readingTime: "6 min"
    },
    {
        id: 3,
        category: "Design",
        title: "Why Aren’t Users Clicking Here?",
        excerpt: "The tragic story of users lost due to poor UI decisions.",
        date: "2026-01-15",
        readingTime: "5 min"
    },
    {
        id: 4,
        category: "Entrepreneurship",
        title: "Think Twice Before Starting a Startup",
        excerpt: "Everyone is chasing unicorns, but the barn is overcrowded.",
        date: "2026-01-18",
        readingTime: "7 min"
    },
    {
        id: 5,
        category: "Technology",
        title: "Is Web3 Really Dead?",
        excerpt: "Did the hype die, or is it just evolving into something else?",
        date: "2026-01-20",
        readingTime: "5 min"
    },
    {
        id: 6,
        category: "Career",
        title: "Why Are Junior Developers Burning Out?",
        excerpt: "A mix of missing mentorship and unrealistic expectations.",
        date: "2026-01-22",
        readingTime: "6 min"
    },
    {
        id: 7,
        category: "Software",
        title: "Don’t Leave Your Brain at the Door When Choosing a Framework",
        excerpt: "Picking tools just because they’re trendy comes at a cost.",
        date: "2026-01-25",
        readingTime: "4 min"
    }
];


const BlogGrid = () => {
    return (
        <section className="text-mycolor2 py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <h2>Lastest Post</h2>
                    <p className="text-sm text-mycolor2/70">
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex h-full flex-col mb-4 overflow-hidden rounded-3xl border border-mycolor2/10 bg-mycolor1/60">
                            <div className="relative h-56 w-full">
                                <Image
                                    src="/bg1.jpg"
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-4 px-5 pt-4">
                                <span className="inline-flex w-fit items-center rounded-full bg-mycolor2 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-mycolor1">
                                    {post.category}
                                </span>
                                <h3 className="text-lg font-semibold leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-mycolor2/70 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto mb-2 flex items-center justify-between pt-2 text-[11px] font-medium text-mycolor2/70">
                                    <span>{post.date}</span>
                                    <span>{post.readingTime}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BlogGrid