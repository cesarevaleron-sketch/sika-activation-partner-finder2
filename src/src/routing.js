import suppliersData from './data/suppliers.json'

// Only active + visible suppliers
export const visibleSuppliers = suppliersData.filter(
  (s) => s.visibility_status === 'Show in MVP' && s.partner_status === 'Active'
)

export function scoreSuppliers(answers) {
  const { create, where, support, scale } = answers

  const scored = visibleSuppliers.map((supplier) => {
    const tags = supplier.tags
    let score = 0

    // create match — highest weight
    if (create && tags.create.includes(create)) score += 4

    // where match
    if (where && where !== 'not_defined' && tags.where.includes(where)) score += 2

    // support match
    if (support && support !== 'not_sure' && support !== 'recommendation_only' && tags.support.includes(support)) score += 3

    // scale match
    if (scale && scale !== 'not_defined' && tags.scale.includes(scale)) score += 1

    // Special boost: "not_sure" on create → favour Design4Retail
    if (create === 'not_sure' && supplier.id === 'design4retail') score += 3

    // lightbox routing: if user picked lightbox on create, strongly boost mobile_lightbox
    if (create === 'lightbox' && supplier.id === 'mobile_lightbox') score += 5
    if (create === 'lightbox' && supplier.id === 'holbox') score -= 10 // never route lightbox to holbox

    // lightbox_solution support → only mobile_lightbox
    if (support === 'lightbox_solution' && supplier.id === 'mobile_lightbox') score += 4

    // shop_in_shop → HMY as primary, D4R as premium alt
    if (create === 'shop_in_shop' && supplier.id === 'hmy_group') score += 3
    if (create === 'shop_in_shop' && supplier.id === 'design4retail') score += 1

    // shelving → HMY primary, propulzija alt
    if (create === 'shelving' && supplier.id === 'hmy_group') score += 2
    if (create === 'shelving' && supplier.id === 'propulzija') score += 1

    // print_pos → printoclock
    if (create === 'print_pos' && supplier.id === 'printoclock') score += 4

    // promo_event → printoclock or holbox; slight boost
    if (create === 'promo_event' && supplier.id === 'printoclock') score += 2
    if (create === 'promo_event' && supplier.id === 'holbox') score += 2
    if (create === 'promo_event' && support === 'lightbox_solution' && supplier.id === 'mobile_lightbox') score += 3

    // product_display → propulzija primary
    if (create === 'product_display' && supplier.id === 'propulzija') score += 3

    // full_concept support + not_sure → design4retail
    if (support === 'full_concept' && create === 'not_sure' && supplier.id === 'design4retail') score += 2

    return { supplier, score }
  })

  scored.sort((a, b) => b.score - a.score)

  const primary = scored[0]
  // Only show alternative if score is meaningful and second is close enough
  const alternative =
    scored[1] && scored[1].score > 0 && scored[0].score - scored[1].score <= 3
      ? scored[1]
      : null

  return { primary: primary.supplier, alternative: alternative?.supplier || null }
}
