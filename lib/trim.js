module.exports = {
  trim,
  trimLeft,
  trimRight
}

function trimRight (delimeter = ' ', options = {}) {
  return trim(delimeter, { ...options, left: false, right: true })
}

function trimLeft (delimeter = ' ', options = {}) {
  return trim(delimeter, { ...options, left: true, right: false })
}

function trim (delimeter = ' ', {
  left = true,
  right = true,
  keep = 0
} = {}) {
  return text => {
    text = text || ''
    let firstIndex = 0
    let lastIndex = text.length
    const keepLeft = keep
    const keepRight = keep

    // Calculate left trim index
    if (left) {
      while (text[firstIndex] === delimeter) {
        firstIndex++
      }

      firstIndex = Math.max(firstIndex - keepLeft, 0)
    }

    // Calculate right trim index
    if (right) {
      while (text[lastIndex - 1] === delimeter) {
        lastIndex--
      }

      lastIndex = Math.min(lastIndex + keepRight, text.length)
    }

    // If there is no trimming to apply, return the original string
    if ((lastIndex - firstIndex) === text.length) {
      return text
    }

    // If our trimming overlaps, return the empty string
    if (firstIndex >= lastIndex) {
      return ''
    }

    // Otherwise slice to the identified trim indices
    return text.slice(firstIndex, lastIndex)
  }
}
