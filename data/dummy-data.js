import Item from "../models/item";
import Shop from "../models/shop";

export const ITEMS = [
  new Item(
    "p1",
    "s1",
    "용녀카페",
    "아메리카노",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    "용녀카페의 아메리카노 입니다.",
    3000
  ),
  new Item(
    "p2",
    "s1",
    "용녀카페",
    "카페 라뗴",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    "용녀카페만의 특별한 카페 라떼.",
    4000
  ),
  new Item(
    "p3",
    "s2",
    "LEE's Coffee Bar",
    "에스프레소",
    "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    "LEE's Coffee Bar의 대표 메뉴입니다.",
    2500
  ),
  new Item(
    "p4",
    "s3",
    "YONG's Cafe",
    "에스프레소",
    "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    "YONG's Cafe의 에스프레소",
    2500
  ),
  new Item(
    "p5",
    "s3",
    "YONG's Cafe",
    "콘파냐",
    "https://images.unsplash.com/photo-1588523779311-c88d79069048?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
    "YONG's 콘파냐",
    3000
  ),
  new Item(
    "p6",
    "s1",
    "용녀카페",
    "카페 모카",
    "https://images.unsplash.com/photo-1522143761982-1ab3d39814aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80",
    "용녀카페의 카페모카!!!",
    4000
  ),
];

export const SHOPS = [
  new Shop(
    "s1",
    "u1",
    "용녀카페",
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3132&q=80",
    "직접 볶은 원두를 사용합니다.",
    false,
    true
  ),
  new Shop(
    "s2",
    "u2",
    "LEE's Coffee Bar",
    "https://images.unsplash.com/photo-1493857671505-72967e2e2760?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80",
    "우리는 새로운 커피 문화를 만듭니다.",
    true,
    false
  ),
  new Shop(
    "s3",
    "u3",
    "YONG's Cafe",
    "https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3174&q=80",
    "S호텔 1층에 위치한 분위기 좋은 카페",
    true,
    true
  ),
];
