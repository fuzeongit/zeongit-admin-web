import type { VNode, VNodeChild } from "vue"
import { Comment, Fragment, isVNode, Text } from "vue"

const TEMPLATE = "template"

export const SCOPE = "VNode"

/**
 * 判断是否碎片
 * @param node 节点
 * @returns
 */
export const isFragment = (node: unknown): node is VNode =>
  isVNode(node) && node.type === Fragment

/**
 * 判断是否文字节点
 * @param node 节点
 * @returns
 */
export const isText = (node: VNodeChild) => (node as VNode).type === Text

/**
 * 判断是否注释
 * @param node 节点
 * @returns
 */
export const isComment = (node: VNodeChild) => (node as VNode).type === Comment

/**
 * 判断是否模板
 * @param node 节点
 * @returns
 */
export const isTemplate = (node: VNodeChild) =>
  (node as VNode).type === TEMPLATE

/**
 * 获取子节点
 * @param node 节点
 * @param depth 搜索深度
 */
function getChildren(node: VNode, depth: number): undefined | VNode {
  if (isComment(node)) return
  if (isFragment(node) || isTemplate(node)) {
    return depth > 0
      ? getFirstValidNode(node.children as VNodeChild, depth - 1)
      : undefined
  }
  return node
}

/**
 * 确定元素是否为有效的元素类型，而不是片段，并进行注释，例如<template>v-if
 * @param node 节点
 */
export const isValidElementNode = (node: unknown): node is VNode =>
  isVNode(node) && !isFragment(node) && !isComment(node)

/**
 * 获取第一个有效的节点
 * @param nodes 节点
 * @param maxDepth 深度
 * @returns
 */
export const getFirstValidNode = (
  nodes: VNodeChild,
  maxDepth = 3
): ReturnType<typeof getChildren> => {
  if (Array.isArray(nodes)) {
    return getChildren(nodes.filter(it=>isValidElementNode(it))[0] as VNode, maxDepth)
  } else {
    return getChildren(nodes as VNode, maxDepth)
  }
}
