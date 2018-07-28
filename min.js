function maskroll(itemList, itemHeight, mask, maskHeight, maskScrollTop) {
  mask.removeChild(mask.childNodes[1]);
  var container = mask.appendChild(document.createElement('div'));

  var topHeight = maskScrollTop - (maskScrollTop % itemHeight);
  console.log('top', topHeight);
  container.appendChild(document.createElement('div')).style.height = topHeight;

  var f = topHeight / itemHeight;
  var i = -1;
  var listHeight = 0;
  while (true) {
    i += 1;
    if (f + i == itemList.length)
      break;

    item = document.createElement('div');
    item.appendChild(document.createTextNode(itemList[f + i].name));
    item.style.height = itemHeight;
    item.style['background-color'] = itemList[f + i].bgColor;
    container.appendChild(item);

    listHeight += itemHeight;
    if (listHeight >= 1.1 * maskHeight)
      break;
  }

  var bottomHeight = itemList.length * itemHeight - topHeight - listHeight;
  console.log('virtual', itemList.length * itemHeight);
  console.log('bottom', bottomHeight);
  container.appendChild(document.createElement('div')).style.height = bottomHeight;
}

function makeMaskrollable(containerId, itemList, itemHeight) {
  var mask = document.getElementById(containerId);
  var maskHeight = parseInt(mask.style.height);
  mask.appendChild(document.createElement('div'));
  mask.style.overflow = 'auto';
  mask.style['max-height'] = itemList.length * itemHeight + 'px';
  mask.onscroll = function() {
    maskroll(itemList, itemHeight, mask, maskHeight, mask.scrollTop);
  }
  maskroll(itemList, itemHeight, mask, maskHeight, 0);
}
