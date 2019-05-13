import os
import cv2 as cv
import numpy as np
import glob
import shutil

prototxt_path = "D:/workspace/python/face_detection/deploy.prototxt"
caffemodel_path = "D:/workspace/python/face_detection/weights.caffemodel"

files = glob.glob("D:/workspace/untitled/public/images/*.jpg")
desFolder = "D:/workspace/untitled/public/person/"
print "Found {0} images in folder!".format(len(files))

model = cv.dnn.readNetFromCaffe(prototxt_path, caffemodel_path)
#listImagesHaveFace=[]
for file in files:
    image = cv.imread(file)
    (h, w) = image.shape[:2]
    blob = cv.dnn.blobFromImage(image, 1.2, (300, 300), (104.0, 177.0, 123.0))
    model.setInput(blob)
    detections = model.forward()
    for i in range(0, detections.shape[2]):
        box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
        (startX, startY, endX, endY) = box.astype("int")
        confidence = detections[0, 0, i, 2]

        if (confidence > 0.5):
            cv.rectangle(image, (startX, startY), (endX, endY), (0, 255, 0), 2)
#            listImagesHaveFace.append(image)
            print "File {0} have a face with {1}% confidence!".format(os.path.basename(file),(confidence*100))
            shutil.move(file,desFolder+os.path.basename(file))
            break

#print "Found {0} faces in {1} images!".format(len(listImagesHaveFace),len(files))
#for hi in listImagesHaveFace:
#    cv.imshow('img',hi)
#    cv.waitKey(0)

