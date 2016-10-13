<?php
// data.php

// json数据库文件路径
$basePath = __DIR__;
$dataFilepath = $basePath . '/data.json';

// 创建json数据库文件
if (!is_file($dataFilepath)) {
    file_put_contents($dataFilepath, json_encode([]));
}

// 载入原始数据
$dataRaw = file_get_contents($dataFilepath);

// 提交评论
if ($_SERVER['REQUEST_METHOD']=="POST") {
    // 组装新评论
    $data = json_decode($dataRaw);
    $data[] = [
        'id' => $_POST['id'],
        'poster' => $_POST['poster'],
        'content' => $_POST['content'],
    ];
    $dataRaw = json_encode($data);

    // 写入json数据库
    file_put_contents($dataFilepath, $dataRaw);
}

header('content-type:application/json;charset=utf8');
echo $dataRaw;
