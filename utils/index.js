//komparatorska funkcija koja oduzima dva datuma
//nju prosledjujemo sort() metodi koju pozivamo nad nizom frontmatter kako bi sortirali postove po datumu
export const sortByDate = (a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}